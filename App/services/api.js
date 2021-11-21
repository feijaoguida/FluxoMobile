import AsyncStorage from "@react-native-async-storage/async-storage";

async function loadStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
}

export default async function api(url, config = {}, data = null) {
  const uri = "https://api.fluxodecaixa.com.br";
  const token = await loadStorage("token");
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = "Bearer " + token;
  }
  if (url[0] != "/") {
    url = "/" + url;
  }
  if (data) {
    let body = "";
    if (!config.method) {
      config.method = "POST";
    }
    if (!config.headers) {
      config.headers = {};
    }
    if (config.headers["Content-Type"] == "application/x-www-form-urlencoded") {
      for (let k in data) {
        body += encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
      }
    } else {
      config.headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    config.body = body;
  }
  //context.store.commit("set", { prop: "loading", value: true });
  try {
    let r = await fetch(uri + url, config);
    let j = await r.json();
    if (j.status == "error" || j.detail) throw j;
    //context.store.commit("set", { prop: "loading", value: false });

    return j;
  } catch (e) {
    let message = (e.message || e.detail).toString() || "";
    alert(message);
    //context.store.commit("set", { prop: "loading", value: false });

    return { error: message };
  }
}
