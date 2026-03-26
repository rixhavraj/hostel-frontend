import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

/*
This file is the Frontend Security Guard.

While your backend authMiddleware.js protects your database, this file protects your website pages. It stops people from just typing localhost:5173/admin/dashboard in the address bar to skip the login screen.

Here is the line-by-line breakdown:

Part 1: Bringing in the Tool (Line 1)
Line 1: import { Navigate } from "react-router-dom";

Maps: This is a tool from React Router that forces the browser to go to a different URL (like a redirect).

Part 2: The Wrapper (Line 3)
Line 3: export default function PrivateRoute({ children }) {

PrivateRoute: This is a React Component that acts like a wrapper or a container.

{ children }: This is a special React keyword. It represents whatever component is inside this wrapper.

Example: In your App.jsx, you likely wrapped the Dashboard like this:

JavaScript

<PrivateRoute>
    <Dashboard />  <-- This is the "children"
</PrivateRoute>
Part 3: The ID Check (Line 4)
Line 4: const token = localStorage.getItem("token");

Checking the Pocket: When you logged in successfully, your browser saved the token in "Local Storage".

This line checks that storage to see if the token is there. It’s like checking if you have your "Entry Ticket" in your pocket.

Part 4: The Rejection (Lines 6–8)
Line 6: if (!token) {

The Check: "Is the token missing?"

Line 7: return <Navigate to="/admin" replace />;

Kick them out: If there is no token, do not show the Dashboard. Instead, force the browser to go back to the Login page (which seems to be at /admin).

replace: This is a cool feature. It replaces the history entry. If the user clicks the browser's "Back" button, it won't let them return to the protected page; it sends them back to where they came from.

Part 5: The Access (Line 10)
Line 10: return children;

Let them in: If the code reaches here, it means the token exists. So, we render the children (the Dashboard, Bookings, or Rooms page) that the user wanted to see.

Summary
User tries to visit Dashboard.

PrivateRoute wakes up: "Do you have a token?"

If NO: It sends them to Login (/admin).

If YES: It shows the Dashboard.
*/