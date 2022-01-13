import { Template, User } from "types";

/* eslint-disable @next/next/no-img-element */
type StatsProps = {
  users: User[];
  templates: Template[];
};

export default function Stats({ users, templates }: StatsProps) {
  return (
    <div className="w-full shadow stats">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Users</div>
        <div className="stat-value text-primary">{users?.length}</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Templates</div>
        <div className="stat-value text-info">{templates?.length}</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-info">
          <div className="avatar online">
            <div className="w-16 h-16 p-1 mask mask-squircle bg-base-100">
              <img
                src="/tailwind-css-component-profile-5@56w.png"
                alt="Avatar Tailwind CSS Component"
                className="mask mask-squircle"
              />
            </div>
          </div>
        </div>
        <div className="stat-value">86%</div>
        <div className="stat-title">Tasks done</div>
        <div className="stat-desc text-info">31 tasks remaining</div>
      </div>
    </div>
  );
}
