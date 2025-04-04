import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  constructor() {}

  // 🔹 Register a New User
  async register(
    email: string,
    password: string,
    role: 'serviceUser' | 'serviceProvider'
  ) {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;

      // 🔥 Save role in Firestore
      await setDoc(doc(this.firestore, 'users', userId), { email, role });

      localStorage.setItem('currUser', JSON.stringify({ email, role })); // ✅ Ensure correct role is stored
      return userCredential;
    } catch (error) {
      console.error('❌ Registration Error:', error);
      throw error;
    }
  }

  // 🔹 Login User with Correct Role Retrieval
  async login(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // 🔥 Retrieve role from Firestore
      const userDoc = await getDoc(doc(this.firestore, 'users', userId));
      const role = userDoc.exists() ? userDoc.data()['role'] : 'serviceUser'; // Default if role is missing

      localStorage.setItem('currUser', JSON.stringify({ email, role }));
      return true;
    } catch (error) {
      console.error('❌ Login Error:', error);
      return false;
    }
  }

  // 🔹 Get Current User
  getCurrentUser() {
    const user = localStorage.getItem('currUser');
    return user ? JSON.parse(user) : null;
  }

  // 🔹 Logout
  async logout(): Promise<void> {
    await signOut(this.auth);
    localStorage.removeItem('currUser');
    this.router.navigateByUrl('/login');
  }

  // 🔹 Check Authentication Status
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  // 🔹 Check Role
  hasRole(role: 'serviceProvider' | 'serviceUser'): boolean {
    return this.getCurrentUser()?.role === role;
  }

  // 🔹 Get Logged-in User Email (Fixed)
  async getLoggedInUserEmail(): Promise<string | null> {
    try {
      await new Promise<void>((resolve, reject) => {
        const unsubscribe = this.auth.onAuthStateChanged(
          (user) => {
            unsubscribe(); // Unsubscribe after state is retrieved
            resolve();
          },
          (error) => {
            console.error('❌ Error in auth state:', error);
            reject(error);
          }
        );
      });
      const user: User | null = this.auth.currentUser;
      return user ? user.email : null;
    } catch (error) {
      console.error('❌ Error getting logged-in email:', error);
      return null;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error('Password Reset Error:', error);
      alert('Failed to send password reset email. Please try again.');
    }
  }

  navigateByUrl(path: string) {
    this.router.navigateByUrl(path);
  }
}
