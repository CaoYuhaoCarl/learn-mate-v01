import { useState } from 'react'
import { LearningMaterials } from './learning-materials'
import { Practice } from './practice'
import { Progress } from './progress'
import { SideNav } from '../layout/side-nav'

export function DashboardLayout() {
  const [currentTab, setCurrentTab] = useState('materials')

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <SideNav value={currentTab} onValueChange={setCurrentTab} />
      
      <main className="flex-1 ml-[200px] p-6 transition-all duration-300">
        {currentTab === 'materials' && <LearningMaterials />}
        {currentTab === 'practice' && <Practice />}
        {currentTab === 'progress' && <Progress />}
      </main>
    </div>
  )
}