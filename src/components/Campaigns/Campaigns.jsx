import React from 'react'
import "./Campaigns.css";
import CampaignItem from './CampaignItem';
function Campaigns() {
  return (
    <section className="campaigns">
      <div className="container">
        <div className="campaigns-wrapper">
          <CampaignItem />
          <CampaignItem />
        </div>
        <div className="campaigns-wrapper">
          <CampaignItem />
          <CampaignItem />
        </div>
      </div>
    </section>
  )
}

export default Campaigns