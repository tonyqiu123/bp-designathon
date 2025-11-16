# Django API Routes Documentation

## Overview

This document provides a comprehensive overview of all API routes available in the Django backend server. The API uses Django REST Framework and Clerk authentication.

**Base URL**: `/api/` (unless otherwise specified)

**Authentication**: Most endpoints require Clerk JWT authentication via Bearer token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Table of Contents

- [Core Routes](#core-routes)
- [Events Routes](#events-routes)
- [Clubs Routes](#clubs-routes)
- [Newsletter Routes](#newsletter-routes)
- [Promotions Routes](#promotions-routes)
- [Admin Routes](#admin-routes)

---

## Core Routes

Base path: `/api/` or `/`

### `GET /`
**Authentication**: None (Public)  
**Description**: Home endpoint with basic API information  
**Response**: JSON object with API message, available endpoints, and authentication info

### `GET /health/`
**Authentication**: None (Public)  
**Description**: Health check endpoint  
**Response**: 
```json
{
  "status": "healthy",
  "message": "Server is running"
}
```

### `GET /api/health/`
**Authentication**: None (Public)  
**Description**: Alternative health check endpoint  
**Response**: Same as `/health/`

### `GET /api/auth/me/`
**Authentication**: Required (JWT)  
**Description**: Get current authenticated user info from Clerk  
**Response**:
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "image_url": "https://...",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### `GET /api/protected/`
**Authentication**: Required (JWT)  
**Description**: Simple protected route that requires Clerk authentication  
**Response**:
```json
{
  "message": "Welcome to the protected area!",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "image_url": "https://..."
  }
}
```

---

## Events Routes

Base path: `/api/events/`

### `GET /api/events/`
**Authentication**: Optional (Public with rate limiting)  
**Rate Limit**: 600 requests/hour per IP  
**Description**: Get events with cursor-based pagination for infinite scroll  
**Query Parameters**:
- `search` (string, optional): Search term(s) separated by semicolons for OR queries
- `cursor` (string, optional): Pagination cursor in format `{dtstart_utc_iso}_{event_id}`
- `start_date` (string, optional): Filter events starting from this date
- `end_date` (string, optional): Filter events ending before this date
- `price_min` (number, optional): Minimum price filter
- `price_max` (number, optional): Maximum price filter
- `food` (string, optional): Filter by food availability
- `location` (string, optional): Filter by location
- `club_type` (string, optional): Filter by club type

**Response**:
```json
{
  "results": [...],
  "nextCursor": "cursor_string",
  "hasMore": true
}
```

### `GET /api/events/<event_id>/`
**Authentication**: Optional (Public)  
**Description**: Get a specific event by ID  
**Response**: Event object with all details

### `PUT /api/events/<event_id>/update/`
**Authentication**: Required (JWT) - Submitter or Admin only  
**Rate Limit**: 30 requests/hour per IP  
**Description**: Update event data (only by submitter or admin)  
**Request Body**:
```json
{
  "event_data": {
    "title": "Event Title",
    "location": "Location",
    "description": "Description",
    "food": "Food info",
    "price": 0
  }
}
```

### `DELETE /api/events/<event_id>/delete/`
**Authentication**: Required (JWT) - Admin only  
**Description**: Delete an event  
**Response**: Success message

### `GET /api/events/export.ics`
**Authentication**: Optional (Public)  
**Description**: Export events as iCalendar (.ics) format  
**Response**: iCalendar file download

### `GET /api/events/google-calendar-urls/`
**Authentication**: Optional (Public)  
**Description**: Get Google Calendar URLs for events  
**Response**: Array of Google Calendar URLs

### `POST /api/events/extract/`
**Authentication**: Required (JWT)  
**Description**: Extract event information from a screenshot  
**Request Body**: Form data with image file  
**Response**: Extracted event data

### `POST /api/events/submit/`
**Authentication**: Required (JWT)  
**Description**: Submit a new event for review  
**Request Body**: Event data object  
**Response**: Created event submission

### `GET /api/events/my-submissions/`
**Authentication**: Required (JWT)  
**Description**: Get all event submissions by the current user  
**Response**: Array of event submissions

### `GET /api/events/submissions/`
**Authentication**: Required (JWT) - Admin only  
**Description**: Get all event submissions (admin view)  
**Response**: Array of all event submissions

### `POST /api/events/submissions/<event_id>/review/`
**Authentication**: Required (JWT) - Admin only  
**Description**: Review and approve/reject an event submission  
**Request Body**:
```json
{
  "action": "approve" | "reject",
  "notes": "Review notes"
}
```

### `DELETE /api/events/submissions/<event_id>/`
**Authentication**: Required (JWT) - Admin or Submitter  
**Description**: Delete an event submission  
**Response**: Success message

### `GET /api/events/my-interests/`
**Authentication**: Required (JWT)  
**Rate Limit**: 100 requests/hour per IP  
**Description**: Get list of event IDs the current user is interested in  
**Response**:
```json
{
  "interested_event_ids": [1, 2, 3, ...]
}
```

### `POST /api/events/<event_id>/interest/mark/`
**Authentication**: Required (JWT)  
**Description**: Mark an event as interested  
**Response**: Success message

### `POST /api/events/<event_id>/interest/unmark/`
**Authentication**: Required (JWT)  
**Description**: Unmark an event as interested  
**Response**: Success message

---

## Clubs Routes

Base path: `/api/clubs/`

### `GET /api/clubs/`
**Authentication**: None (Public)  
**Rate Limit**: 60 requests/hour per IP  
**Description**: Get clubs with cursor-based pagination for infinite scroll  
**Query Parameters**:
- `search` (string, optional): Search term to filter by club name
- `category` (string, optional): Filter by category (use "all" to show all)
- `cursor` (string, optional): Pagination cursor (club ID)

**Response**:
```json
{
  "results": [
    {
      "id": 1,
      "club_name": "Club Name",
      "categories": ["category1", "category2"],
      "club_page": "https://...",
      "ig": "@instagram",
      "discord": "discord_link",
      "club_type": "type"
    }
  ],
  "nextCursor": "cursor_string",
  "hasMore": true,
  "totalCount": 100
}
```

---

## Newsletter Routes

Base path: `/api/newsletter/`

### `POST /api/newsletter/subscribe/`
**Authentication**: None (Public)  
**Description**: Subscribe to the newsletter  
**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "message": "Successfully subscribed! Check your email for upcoming events.",
  "email": "user@example.com"
}
```

### `GET /api/newsletter/unsubscribe/<token>/`
**Authentication**: None (Public)  
**Description**: Get unsubscribe page info (returns subscriber status)  
**Response**:
```json
{
  "already_unsubscribed": false,
  "email": "user@example.com",
  "message": "Ready to unsubscribe",
  "unsubscribed_at": null
}
```

### `POST /api/newsletter/unsubscribe/<token>/`
**Authentication**: None (Public)  
**Description**: Unsubscribe from the newsletter  
**Request Body**:
```json
{
  "reason": "Reason for unsubscribing",
  "feedback": "Additional feedback"
}
```

**Response**:
```json
{
  "message": "Successfully unsubscribed from the newsletter.",
  "email": "user@example.com",
  "unsubscribed_at": "2024-01-01T00:00:00Z"
}
```

### `POST /api/newsletter/test-email/`
**Authentication**: None (Public)  
**Description**: Internal testing route to send test email  
**Response**:
```json
{
  "message": "Test email sent successfully to e22han@uwaterloo.ca",
  "status": "success"
}
```

---

## Promotions Routes

Base path: `/api/promotions/`

### `GET /api/promotions/events/`
**Authentication**: None (Public)  
**Description**: Get all currently promoted events (active, non-expired)  
**Query Parameters**:
- `promotion_type` (string, optional): Filter by promotion type (standard, featured, urgent, sponsored)

**Response**:
```json
{
  "promoted_events": [
    {
      "id": 1,
      "title": "Event Title",
      "dtstart": "2024-01-01T00:00:00Z",
      "dtend": "2024-01-01T23:59:59Z",
      "location": "Location",
      "description": "Description",
      "source_image_url": "https://...",
      "club_handle": "@instagram",
      "promotion": {
        "is_active": true,
        "promoted_at": "2024-01-01T00:00:00Z",
        "priority": 5,
        "promotion_type": "featured",
        "expires_at": "2024-12-31T23:59:59Z"
      }
    }
  ]
}
```

### `POST /api/promotions/events/<event_id>/promote/`
**Authentication**: Required (JWT) - Admin only  
**Description**: Promote an event by creating an EventPromotion record  
**Request Body**:
```json
{
  "priority": 5,
  "expires_at": "2024-12-31T23:59:59Z",
  "promoted_by": "admin_username",
  "promotion_type": "featured",
  "notes": "Promotion notes"
}
```

**Request Body Parameters**:
- `priority` (integer, required): Priority between 1-10 (default: 1)
- `expires_at` (string, optional): ISO-8601 datetime string
- `promoted_by` (string, optional): Username of promoter (defaults to current user)
- `promotion_type` (string, optional): One of "standard", "featured", "urgent", "sponsored" (default: "standard")
- `notes` (string, optional): Promotion notes

**Response**:
```json
{
  "message": "Event promoted successfully",
  "event_id": 1,
  "promotion": {
    "is_active": true,
    "promoted_at": "2024-01-01T00:00:00Z",
    "promoted_by": "admin",
    "expires_at": "2024-12-31T23:59:59Z",
    "priority": 5,
    "promotion_type": "featured",
    "notes": "Notes"
  }
}
```

### `POST /api/promotions/events/<event_id>/unpromote/`
**Authentication**: Required (JWT) - Admin only  
**Description**: Deactivate an event promotion  
**Response**:
```json
{
  "message": "Event unpromoted successfully",
  "event_id": 1
}
```

### `GET /api/promotions/events/<event_id>/promotion-status/`
**Authentication**: Required (JWT) - Admin only  
**Description**: Get promotion status for a specific event  
**Response**:
```json
{
  "event_id": 1,
  "event_name": "Event Name",
  "is_promoted": true,
  "promotion": {
    "is_active": true,
    "promoted_at": "2024-01-01T00:00:00Z",
    "promoted_by": "admin",
    "expires_at": "2024-12-31T23:59:59Z",
    "priority": 5,
    "promotion_type": "featured",
    "notes": "Notes",
    "is_expired": false
  }
}
```

---

## Admin Routes

### `GET /admin/`
**Authentication**: Django Admin authentication  
**Description**: Django admin panel  
**Access**: Admin users only

---

## Authentication Details

### Clerk JWT Authentication

Most endpoints require Clerk JWT authentication. Include the Bearer token in the Authorization header:

```
Authorization: Bearer <clerk_jwt_token>
```

### Permission Levels

1. **Public**: No authentication required
2. **JWT Required**: Any authenticated user
3. **Admin Only**: Requires admin role in Clerk
4. **Submitter or Admin**: Event submitter or admin can access

### Rate Limiting

Some endpoints have rate limiting applied:
- Events list: 600 requests/hour per IP
- Event updates: 30 requests/hour per IP
- User interests: 100 requests/hour per IP
- Clubs list: 60 requests/hour per IP

---

## Error Responses

All endpoints may return standard HTTP error responses:

- `400 Bad Request`: Invalid request parameters or data
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Authenticated but insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error response format:
```json
{
  "error": "Error message",
  "details": {...}
}
```

---

## Notes

- All datetime fields use ISO-8601 format
- Pagination uses cursor-based approach for better performance
- Search supports multiple terms separated by semicolons (OR logic)
- Event filtering supports multiple parameters that can be combined
- Rate limits are applied per IP address

