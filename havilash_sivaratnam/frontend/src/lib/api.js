const BASE_URL = 'http://127.0.0.1:8000/api'
const AUTH_URL = `${BASE_URL}/auth`

const GITHUB_NAME = 'Havilash'
const GITHUB_BASE_URL = 'https://api.github.com' 
const GITHUB_REPO_URL = `${GITHUB_BASE_URL}/repos`
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export async function getRepo(repoName) {
    const response = await fetch(`${GITHUB_REPO_URL}/${GITHUB_NAME}/${repoName}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        },
    })

    if (!response.ok) {
       return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getRepoCollaborators(repoName) {
    const response = await fetch(`${GITHUB_REPO_URL}/${GITHUB_NAME}/${repoName}/collaborators`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        },
    })

    if (!response.ok) {
       return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getUser({ token }) {
    const response = await fetch(`${AUTH_URL}/user`, {
        method: "GET",
        headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function login({ email, password }) {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: {
        "content-type": "application/json",
        },
        body: JSON.stringify({email, password})
    })

    if (!response.ok) {
        const errorResponse = await response.json();
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          response: errorResponse
        });
    }

    const data = await response.json()
    return data
}

export async function register({ name, email, password, password_confirmation, comment, key }) {
    const body = { name, email, password, password_confirmation, comment };
    if (key) {
      body.key = key;
    }
    const response = await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: {
        "content-type": "application/json",
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        const errorResponse = await response.json();
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          response: errorResponse
        });
    }

    const data = await response.json()
    return data
}

export async function refresh({ token }) {
    const response = await fetch(`${AUTH_URL}/refresh`, {
        method: "POST",
        headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function logout({ token }) {
    const response = await fetch(`${AUTH_URL}/logout`, {
        method: "POST",
        headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getFile({ token, path }) {
    const response = await fetch(`${BASE_URL}/file/${path}`, {
        method: "GET",
        headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    return response
}