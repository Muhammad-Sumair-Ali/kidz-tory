# AI KidzTory Admin Panel

A comprehensive admin dashboard for managing users, stories, and viewing analytics for the AI KidzTory platform.

## Features

### 📊 Dashboard Overview
- **Real-time Statistics**: Total users, stories, growth rates, and averages
- **Interactive Charts**: Stories by language, age group, theme, and mood
- **Top Users**: Most active story creators
- **Daily Analytics**: Story creation trends over time
- **Period Filtering**: View stats for 7, 30, 90 days, or 1 year

### 👥 User Management
- **User Listing**: Paginated table with search and sorting
- **User Details**: Name, email, join date, story count, last activity
- **User Actions**: Delete users and their associated stories
- **Search & Filter**: Find users by name or email
- **Sorting**: Sort by name, email, join date, or story count

### 📚 Story Management
- **Story Listing**: Comprehensive story table with filters
- **Story Details**: Title, content preview, author, language, age group
- **Advanced Filtering**: Filter by language, age group, or search content
- **Story Actions**: View full story details or delete stories
- **Bulk Operations**: Efficient story management

### 🔒 Security Features
- **Admin Authentication**: Email-based admin access control
- **Protected Routes**: Secure API endpoints
- **Role-based Access**: Only authorized admins can access the panel

## Setup Instructions

### 1. Configure Admin Access

Edit the admin emails in `/components/common/Navbar.tsx`:

```typescript
const NEXT_PUBLIC_ADMIN_EMAIL = [
  "admin@kidztory.com",
  "your-email@example.com", // Add your email here
  // Add more admin emails as needed
];
```

### 2. Database Models

Ensure your MongoDB models include the required fields:

**User Model** should have:
- `name`, `email`, `createdAt`

**Story Model** should have:
- `title`, `story`, `language`, `ageGroup`, `theme`, `mood`, `userId`, `createdAt`

### 3. API Routes

The following API routes are automatically created:
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - User management
- `DELETE /api/admin/users` - Delete user
- `GET /api/admin/stories` - Story management  
- `DELETE /api/admin/stories` - Delete story

### 4. Access the Admin Panel

1. Log in with an admin email account
2. Navigate to `/admin` or click the "Admin" link in the navbar
3. The admin link only appears for authorized users

## API Endpoints

### Statistics API (`/api/admin/stats`)

**Query Parameters:**
- `period` (optional): Number of days for recent stats (default: 30)

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 150,
      "totalStories": 450,
      "recentUsers": 25,
      "recentStories": 75,
      "avgStoriesPerUser": 3.0,
      "userGrowthRate": 15.5,
      "storyGrowthRate": 22.3
    },
    "charts": {
      "storiesByLanguage": [...],
      "storiesByAgeGroup": [...],
      "storiesByTheme": [...],
      "storiesByMood": [...],
      "dailyStats": [...]
    },
    "topUsers": [...],
    "period": 30
  }
}
```

### Users API (`/api/admin/users`)

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term for name/email
- `sortBy`: Field to sort by (default: 'createdAt')
- `sortOrder`: 'asc' or 'desc' (default: 'desc')

### Stories API (`/api/admin/stories`)

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term for title/content
- `language`: Filter by language
- `ageGroup`: Filter by age group
- `sortBy`: Field to sort by (default: 'createdAt')
- `sortOrder`: 'asc' or 'desc' (default: 'desc')

## Components Structure

```
components/admin/
├── StatsCard.tsx          # Individual statistic cards
├── ChartCard.tsx          # Chart visualization component
├── UsersTable.tsx         # User management table
├── StoriesTable.tsx       # Story management table
└── AdminLink.tsx          # Admin navigation link

hooks/
└── useAdmin.tsx           # Admin-specific React Query hooks

app/api/admin/
├── stats/route.ts         # Statistics API
├── users/route.ts         # User management API
└── stories/route.ts       # Story management API

app/(pages)/admin/
└── page.tsx              # Main admin dashboard
```

## Features in Detail

### Dashboard Analytics
- **Growth Metrics**: Compare current period with previous period
- **Visual Charts**: Bar charts, pie charts, and trend lines
- **Real-time Updates**: Auto-refresh every 5 minutes
- **Responsive Design**: Works on desktop and mobile

### User Management
- **Comprehensive Search**: Find users by name or email
- **Advanced Sorting**: Sort by any column
- **User Activity**: See last story creation date
- **Safe Deletion**: Confirmation dialogs prevent accidental deletions

### Story Management
- **Rich Filtering**: Multiple filter options
- **Content Preview**: See story titles and content previews
- **Author Information**: Quick access to story creator details
- **Bulk Actions**: Efficient management of multiple stories

## Security Considerations

1. **Admin Email List**: Keep the admin email list secure and updated
2. **Environment Variables**: Consider moving admin emails to environment variables
3. **API Protection**: All admin APIs check for proper authentication
4. **Audit Logging**: Consider adding audit logs for admin actions

## Customization

### Adding New Statistics
1. Add new aggregation queries in `/api/admin/stats/route.ts`
2. Update the `AdminStats` interface in `/hooks/useAdmin.tsx`
3. Create new chart components or modify existing ones

### Adding New Filters
1. Update the API route query handling
2. Add new filter controls in the table components
3. Update the React Query keys to include new filters

### Styling Customization
- All components use Tailwind CSS with dark theme
- Consistent color scheme: purple/pink gradients
- Responsive design patterns throughout

## Troubleshooting

### Admin Link Not Showing
- Check if your email is in the `NEXT_PUBLIC_ADMIN_EMAIL` array
- Ensure you're logged in with the correct account
- Verify the email matches exactly (case-sensitive)

### API Errors
- Check database connection
- Verify MongoDB models are properly set up
- Check console for detailed error messages

### Performance Issues
- Consider adding database indexes for frequently queried fields
- Implement pagination for large datasets
- Use React Query caching effectively

## Future Enhancements

- **Export Functionality**: Export data to CSV/Excel
- **Advanced Analytics**: More detailed charts and metrics
- **Audit Logs**: Track admin actions
- **Bulk Operations**: Mass user/story management
- **Email Notifications**: Alert admins of important events
- **Role-based Permissions**: Different admin levels
- **Real-time Updates**: WebSocket-based live updates

## Support

For issues or questions about the admin panel:
1. Check the console for error messages
2. Verify database connectivity
3. Ensure proper authentication setup
4. Review the API response formats

The admin panel is designed to be intuitive and powerful, providing all the tools needed to effectively manage your AI KidzTory platform.