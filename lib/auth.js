"use server";

import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';

export async function login(password) {
  let adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  try {
    const fs = require('fs');
    const path = require('path');
    const authPath = path.join(process.cwd(), 'data', 'auth.json');
    if (fs.existsSync(authPath)) {
      const authData = JSON.parse(fs.readFileSync(authPath, 'utf8'));
      if (authData.password) adminPassword = authData.password;
    }
  } catch (e) {
    console.error("Error reading auth.json", e);
  }

  if (password === adminPassword) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
    // Security: Use a unique token instead of a plain string
    const token = Buffer.from(adminPassword + "luxury-salt").toString('base64');
    (await cookies()).set(SESSION_COOKIE, token, { expires, httpOnly: true });
    return true;
  }
  return false;
}


export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAuthenticated() {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return false;

  let adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  try {
    const fs = require('fs');
    const path = require('path');
    const authPath = path.join(process.cwd(), 'data', 'auth.json');
    if (fs.existsSync(authPath)) {
      const authData = JSON.parse(fs.readFileSync(authPath, 'utf8'));
      if (authData.password) adminPassword = authData.password;
    }
  } catch (e) {}

  const expectedToken = Buffer.from(adminPassword + "luxury-salt").toString('base64');
  return session === expectedToken;
}

