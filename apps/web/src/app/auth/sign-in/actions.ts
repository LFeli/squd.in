'use server'

export async function signInWithEmailAction() {
  await new Promise(resolve => setTimeout(resolve, 5000))
  console.log('sign in with email')
}

export async function signInWithGithubAction() {
  await new Promise(resolve => setTimeout(resolve, 5000))
  console.log('sign in with github')
}
