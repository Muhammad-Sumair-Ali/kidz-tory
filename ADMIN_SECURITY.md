# Admin Panel Security Guide

## 🔒 Enhanced Security Features

The admin panel now includes multiple layers of security to protect your application:

### 1. **Multi-Layer Authentication**

#### Email-based Access Control
- Only authorized email addresses can access the admin panel
- Configure admin emails in `/app/(admin-portla)/layout.tsx`
- Emails are checked against a whitelist

#### Access Code Protection
- Additional security layer requiring an access code
- Set via `NEXT_PUBLIC_ADMIN_ACCESS_CODE` environment variable
- Default code: `KIDZTORY_ADMIN_2024` (change this!)
- Access code is verified and stored in session storage

#### Session-based Verification
- Access code verification persists during browser session
- Automatically cleared when browser is closed
- Re-verification required for new sessions

### 2. **Route Protection**

#### Secure Layout
- All admin routes are wrapped in a secure layout
- Automatic redirection for unauthorized users
- Loading states during authentication checks
- Clear error messages for access denials

#### API Route Security
- All admin API endpoints check for proper authentication
- JWT token verification using NextAuth
- Admin email validation on every request

### 3. **Environment Variable Management**

#### Dynamic API Key Updates
- Secure interface for updating API keys
- Real-time environment variable modification
- Automatic `.env.local` file updates
- Masked display of sensitive information

#### Supported API Keys
- `GROQ_API_KEY` - Groq Llama-3.3-70B API
- `STABILITY_API_KEY` - Stability AI API
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## 🛡️ Security Setup Instructions

### Step 1: Configure Admin Emails

Edit `/app/(admin-portla)/layout.tsx`:

```typescript
const NEXT_PUBLIC_ADMIN_EMAIL = [
  "admin@kidztory.com",
  "your-email@example.com", // Add your email here
  // Add more admin emails as needed
];
```

### Step 2: Set Admin Access Code

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_ADMIN_ACCESS_CODE=your-secure-access-code-here
```

**Important:** Change the default access code to something secure and unique!

### Step 3: Verify NextAuth Configuration

Ensure NextAuth is properly configured:

```bash
NEXTAUTH_SECRET=your-secure-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### Step 4: Test Security

1. Try accessing `/admin` without being logged in
2. Try accessing with a non-admin email
3. Try accessing with wrong access code
4. Verify proper access with admin email and correct code

## 🔐 Security Best Practices

### Access Code Security
- **Use a strong, unique access code**
- **Change the default code immediately**
- **Don't share the access code publicly**
- **Consider rotating the code periodically**

### Email Security
- **Use official company email addresses**
- **Regularly review the admin email list**
- **Remove access for former team members**
- **Consider using role-based email addresses**

### API Key Management
- **Never commit API keys to version control**
- **Use the admin panel to update keys securely**
- **Monitor API key usage and costs**
- **Rotate keys regularly**

### Environment Variables
- **Keep `.env.local` out of version control**
- **Use different keys for development/production**
- **Backup your environment configuration**
- **Document required environment variables**

## 🚨 Security Warnings

### Critical Security Notes

1. **Admin Access Code**: The access code is stored in `NEXT_PUBLIC_` which means it's visible in the client bundle. This is intentional for this implementation but consider server-side verification for production.

2. **Environment File Modification**: The settings panel modifies `.env.local` directly. Ensure proper file permissions and backup strategies.

3. **Session Storage**: Access verification is stored in browser session storage. This provides security while maintaining usability.

4. **API Key Display**: API keys are masked in the UI but the full keys are sent to the server for updates.

## 🔧 Advanced Security Options

### Option 1: Server-Side Access Code Verification

For enhanced security, move access code verification to the server:

```typescript
// In your API routes
const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE; // Remove NEXT_PUBLIC_
```

### Option 2: Database-Based Admin Management

Store admin users in the database:

```typescript
// Create an Admin model
const adminUser = await Admin.findOne({ email: userEmail, isActive: true });
```

### Option 3: Role-Based Access Control

Implement different admin roles:

```typescript
enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}
```

### Option 4: Two-Factor Authentication

Add 2FA for additional security:

```typescript
// Integrate with services like Authy or Google Authenticator
```

## 📊 Security Monitoring

### Recommended Monitoring

1. **Login Attempts**: Log all admin access attempts
2. **API Key Changes**: Track when API keys are modified
3. **Failed Access**: Monitor failed authentication attempts
4. **Session Duration**: Track admin session lengths

### Implementation Example

```typescript
// Add to your admin API routes
console.log(`Admin access attempt: ${userEmail} at ${new Date()}`);
```

## 🔄 Security Maintenance

### Regular Tasks

1. **Review Admin Access**: Monthly review of admin email list
2. **Rotate Access Codes**: Quarterly access code rotation
3. **Update Dependencies**: Keep security packages updated
4. **Audit Logs**: Review access logs regularly
5. **Backup Configuration**: Regular backup of environment settings

### Emergency Procedures

1. **Compromised Access**: Immediately change access codes and remove compromised emails
2. **API Key Breach**: Rotate all API keys immediately
3. **Unauthorized Access**: Review logs and strengthen security measures

## 📞 Support

If you encounter security issues:

1. **Check Configuration**: Verify all environment variables are set correctly
2. **Review Logs**: Check browser console and server logs for errors
3. **Test Authentication**: Verify NextAuth is working properly
4. **Validate Permissions**: Ensure file permissions allow environment file modification

## 🎯 Security Checklist

- [ ] Changed default admin access code
- [ ] Added your email to admin list
- [ ] Configured NextAuth properly
- [ ] Tested admin panel access
- [ ] Verified API key management works
- [ ] Set up monitoring/logging
- [ ] Created backup of configuration
- [ ] Documented access procedures for team
- [ ] Reviewed security best practices
- [ ] Planned regular security maintenance

Remember: Security is an ongoing process, not a one-time setup. Regularly review and update your security measures to protect your application and data.