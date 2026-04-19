"use server";

import fs from 'fs';
import path from 'path';
import { isAuthenticated } from './auth';

const DATA_PATH = path.join(process.cwd(), 'data');
const MESSAGES_PATH = path.join(process.cwd(), 'messages');

// Helper to get raw JSON data
export async function getJsonData(fileName) {
  try {
    const filePath = path.join(DATA_PATH, fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

// Helper to get translation messages
export async function getMessagesData(locale) {
  try {
    const filePath = path.join(MESSAGES_PATH, `${locale}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading messages for ${locale}:`, error);
    return {};
  }
}

// THE CORE SAVE ACTION
// Logic: If Local -> Save to Disk. If Production on Vercel -> Explain GitHub API.
export async function saveData(type, data, fileName) {
  // Security Check: CRITICAL
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized Access");
  
  if (process.env.NODE_ENV === 'development') {
    return saveLocally(type, data, fileName);
  } else {
    // For Production on Vercel, we need GitHub API
    return saveViaGitHub(type, data, fileName);
  }
}


async function saveLocally(type, data, fileName) {
  try {
    const baseDir = type === 'data' ? DATA_PATH : MESSAGES_PATH;
    const filePath = path.join(baseDir, fileName);
    
    // Format JSON with 2 spaces indentation
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf8');
    
    return { success: true, message: 'Saved locally successfully!' };
  } catch (error) {
    console.error('Error saving locally:', error);
    return { success: false, error: error.message };
  }
}

async function saveViaGitHub(type, data, fileName) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.GITHUB_REPO_OWNER; // e.g., "username"
  const REPO_NAME = process.env.GITHUB_REPO_NAME;   // e.g., "riyad-app"
  const FILE_PATH = type === 'data' ? `data/${fileName}` : `messages/${fileName}`;

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    return { 
      success: false, 
      error: 'GitHub Configuration Missing. Please set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME in Vercel Env Variables.' 
    };
  }

  try {
    // 1. Get the current file SHA (required for update)
    const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const getRes = await fetch(getUrl, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) throw new Error('Could not fetch file from GitHub');
    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Update the file
    const putRes = await fetch(getUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Admin Update: ${fileName}`,
        content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
        sha: sha
      })
    });

    if (!putRes.ok) throw new Error('Could not update file on GitHub');

    return { success: true, message: 'Updated on GitHub and Redeploy Triggered!' };
  } catch (error) {
    console.error('GitHub API Error:', error);
    return { success: false, error: error.message };
  }
}

// Image Upload to ImgBB
export async function uploadImage(formData) {
  // Security Check: CRITICAL
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized Access");

  const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
  if (!IMGBB_API_KEY) return { success: false, error: 'IMGBB_API_KEY missing' };

  try {
    const file = formData.get('image');
    const body = new FormData();
    body.append('image', file);

    const res = await fetch(`https://api.api-imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: body
    });

    const result = await res.json();
    if (result.success) {
      return { success: true, url: result.data.url };
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Image Upload Error:', error);
    return { success: false, error: error.message };
  }
}
