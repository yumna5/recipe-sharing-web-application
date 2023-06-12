import ENV from "./../config.js";

const API_HOST = ENV.api_host;

export const getAllRecipes = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/recipes`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.status === 200) {
      return json.result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/users`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.status === "ok") {
      return json.users;
    }
  } catch (err) {
    console.log(err);
  }
};

export const followUser = async (userId) => {
  try {
    const response = await fetch(`${API_HOST}/api/users/follow/${userId}`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.status === 200) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await fetch(`${API_HOST}/api/users/follow/${userId}`, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.status === 200) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_HOST}/api/users/${userId}`, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.status === 200) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const changeVerify = async (userId, isVerified) => {
  try {
    const response = await fetch(`${API_HOST}/api/users/verify/${userId}`, {
      method: "post",
      body: JSON.stringify({
        verify: isVerified
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.status === 200) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const createRecipe = async (
  title,
  description,
  time,
  cuisines,
  restrictions,
  servingNumber,
  ingredients,
  materials,
  instructions,
  notes,
  img
) => {
  try {
    const response = await fetch(`${API_HOST}/api/recipes`, {
      method: "post",
      body: JSON.stringify({
        title: title,
        slug: title,
        description: description,
        time_needed: time,
        cuisines: cuisines,
        restrictions: restrictions,
        tags: "",
        servingAmount: servingNumber,
        ingredients: ingredients,
        materials: materials,
        instructions: instructions,
        notes: notes,
        img: img,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const editRecipe = async (
  id,
  title,
  description,
  time,
  cuisines,
  restrictions,
  servingNumber,
  ingredients,
  materials,
  instructions,
  notes
) => {
  try {
    const response = await fetch(`${API_HOST}/api/recipes/${id}`, {
      method: "post",
      body: JSON.stringify({
        title: title,
        description: description,
        time_needed: time,
        cuisines: cuisines,
        restrictions: restrictions,
        tags: "",
        servingAmount: servingNumber,
        ingredients: ingredients,
        materials: materials,
        instructions: instructions,
        notes: notes,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getFeed = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/recipes/following`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.status === 200) {
      return json.result;
    }
  } catch (err) {
    console.log(err);
  }
};
