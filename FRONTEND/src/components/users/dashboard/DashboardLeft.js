import React, { Component } from 'react';
import DashboardAvatar from './DashboardAvatar';
import DashboardNav from './DashboardNav';

const DashboardLeft = () => {
  return(
    <div className="dashboard-left-navigation">
      <DashboardAvatar />
      <DashboardNav />
    </div>
  )
}

export default DashboardLeft;