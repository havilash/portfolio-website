const GITHUB_NAME = "Havilash"
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
       return Promise.reject(response.statusText)
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
       return Promise.reject(response.statusText)
    }

    const data = await response.json()
    return data
}