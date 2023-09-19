import { Link } from "@remix-run/react";

export default function TestIndex() {
  return (
    <div>
      <h2>API Endpoint Tests</h2>
      <ul>
        <li><Link to="./user">User Tests</Link></li>
        {/* More test categories as you expand */}
      </ul>
    </div>
  );
}
