
const GITHUB_BASE_URL = 'https://api.github.com' 
const GITHUB_REPO_URL = `${GITHUB_BASE_URL}/repos`

export async function getRepo(repoName) {
    const response = await fetch(`${GITHUB_REPO_URL}/${repoName}`)

    if (!response.ok) {
       return Promise.reject(response.statusText)
    }

    const data = await response.json()
    return data
}

export async function getRepoContributors(repoName) {
    const response = await fetch(`${GITHUB_REPO_URL}/${repoName}/contributors`)

    if (!response.ok) {
       return Promise.reject(response.statusText)
    }

    const data = await response.json()
    return data
}