import React from 'react'
import { MessageSquare } from 'lucide-react'
const NoChatSelected = () => {
  return (
    <div className="mt-[5rem] pr-4 h-fit w-full flex flex-1 flex-col items-center justify-center">
      <div className="max-w-full text-center space-y-6">

        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to HelloW!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
        
      </div>
    </div>
  )
}

export default NoChatSelected
