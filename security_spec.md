# Security Specification — Hridayam by Belvo

## 1. Data Invariants
1. **PII Isolation**: User email, phone, and organization live exclusively in `/users/{userId}/private/info` and `/enquiries/{enquiryId}`. Public `/users/{userId}` documents contain zero PII and reads on `/users/{userId}/private/*` and `/enquiries/*` are restricted to the owner or platform admins.
2. **Ownership & Auth Integrity**:
   - A course cannot be created unless `instructorId == request.auth.uid` (or `isAdmin()`), and non-admins cannot modify or delete courses owned by another instructor.
   - A lesson inside `/courses/{courseId}/lessons/{lessonId}` requires the parent course to exist (`exists(...)`) and match the instructor or admin.
   - An enrolment requires the referenced course to exist (`exists(...)`), `userId == request.auth.uid`, and cannot change `userId`, `courseId`, or `enrolledAt` after creation.
   - Once an enrolment reaches `status == 'completed'`, non-admins cannot revert it back to `'active'`.
   - Certificates can only be created when the student has an existing enrolment for that `courseId` or by an admin, with `userId == request.auth.uid`.
3. **Immutable Fields & Server Timestamps**: `createdAt`, `enrolledAt`, `userId`, `uid`, and `instructorId` are immutable after creation; `createdAt == request.time` on create and `updatedAt == request.time` on update.
4. **Admin Bootstrap & Verified Email**: Admin privileges require `request.auth.token.email_verified == true` and either an entry in `/admins/{uid}` or the bootstrapped admin email `srakshitha912@gmail.com`.

## 2. The "Dirty Dozen" Payloads (Adversarial Tests)
1. **Shadow Field Injection on Course Create**: `{ ...validCourse, isFeaturedVerified: true }` -> `PERMISSION_DENIED` (blocked by `hasOnly`).
2. **Identity Spoofing on Course Create**: `{ ...validCourse, instructorId: "other-instructor-uid" }` -> `PERMISSION_DENIED`.
3. **Unverified Email Course Write**: Verified token false (`email_verified: false`) attempting course create -> `PERMISSION_DENIED`.
4. **Email Spoofing Admin Bypass**: Token with `email: "srakshitha912@gmail.com"` and `email_verified: false` reading `/enquiries` -> `PERMISSION_DENIED`.
5. **PII Blanket Read on Private User Info**: Non-owner signed-in user reading `/users/victimUid/private/info` -> `PERMISSION_DENIED`.
6. **Query Delegation Scrape on Enrolments**: Signed-in student listing `/enrolments` without `where('userId', '==', uid)` -> `PERMISSION_DENIED`.
7. **ID Poisoning on Course Create**: Document ID exceeding 128 chars or containing invalid symbols (`../bad$id`) -> `PERMISSION_DENIED` via `isValidId`.
8. **Value Poisoning on Course Update**: Updating `title` to a 1MB string or `price` to a string `"free"` -> `PERMISSION_DENIED` via `isValidCourse`.
9. **Terminal State Reversal on Enrolment**: Student attempting to update a `'completed'` enrolment back to `'active'` -> `PERMISSION_DENIED`.
10. **Orphaned Enrolment Creation**: Creating an enrolment referencing non-existent `courseId: "nonexistent-course"` -> `PERMISSION_DENIED` via `exists()`.
11. **Timestamp Forgery on Subscription**: Creating subscription with backdated `createdAt` not matching `request.time` -> `PERMISSION_DENIED`.
12. **Self-Assigned Admin Escalation**: Regular user attempting `setDoc` on `/admins/{uid}` -> `PERMISSION_DENIED`.
