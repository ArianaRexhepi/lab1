import React from "react";
import "./homepage.css";

export default function PersonalProfile() {
  return (
    <div class="card">
      <div class="card-front">
        <p class="title">John Doe</p>
        <p class="subtitle">Web Dev</p>
      </div>
      <div class="card-back">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
}
