const BASE_URL = window.BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
const AUTH_URL = `${BASE_URL}/auth`;
const DATA_URL = `${BASE_URL}/data`;

const GITHUB_BASE_URL = "https://api.github.com";
const GITHUB_REPO_URL = `${GITHUB_BASE_URL}/repos`;
const GITHUB_TOKEN = window.GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;

// Github
export async function getRepo(repo) {
  const response = await fetch(`${GITHUB_REPO_URL}/${repo}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function getRepoCollaborators(repo) {
  const response = await fetch(`${GITHUB_REPO_URL}/${repo}/collaborators`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function getRepoFile(repo, filePath) {
  const response = await fetch(
    `${GITHUB_REPO_URL}/${repo}/contents/${filePath}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

// Auth
export async function getUser({ token }) {
  const response = await fetch(`${AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function getUsers({ token }) {
  const response = await fetch(`${AUTH_URL}/users`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function updateUser({ token }, { id, name, comment, access }) {
  const response = await fetch(`${AUTH_URL}/user/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, comment, access }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function deleteUser({ token }, { id }) {
  const response = await fetch(`${AUTH_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function login({ email, password }) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function register({
  name,
  email,
  password,
  password_confirmation,
  comment,
  key,
}) {
  const body = { name, email, password, password_confirmation, comment };
  if (key) {
    body.key = key;
  }
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function refresh({ token }) {
  const response = await fetch(`${AUTH_URL}/refresh`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function logout({ token }) {
  const response = await fetch(`${AUTH_URL}/logout`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function createKey({ token }, { expires_at }) {
  let body = {};
  if (expires_at) {
    body.expires_at = expires_at;
  }

  const response = await fetch(`${AUTH_URL}/key`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function getKeys({ token }) {
  const response = await fetch(`${AUTH_URL}/keys`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function updateKey({ token }, { id, new_key, expires_at }) {
  const body = {};
  if (new_key) body.new_key = new_key;
  if (expires_at) body.expires_at = expires_at;

  const response = await fetch(`${AUTH_URL}/key/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function deleteKey({ token }, { id }) {
  const response = await fetch(`${AUTH_URL}/key/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

// Data
export async function getFile({ token }, { name }) {
  const response = await fetch(`${DATA_URL}/file/${name}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function getFiles({ token }) {
  const response = await fetch(`${DATA_URL}/files`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function createFile({ token }, { name, file }) {
  const response = await fetch(`${DATA_URL}/file`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, file }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function updateFile({ token }, { name, file }) {
  const response = await fetch(`${DATA_URL}/file/${name}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ file }),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function deleteFile({ token }, { name }) {
  const response = await fetch(`${DATA_URL}/file/${name}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}
