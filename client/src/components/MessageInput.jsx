import React from 'react'
import { Send , Image ,X , Loader2} from "lucide-react";
import {useState,useRef} from "react";
import {useChatStore} from "../store/useChatStore.js"
const MessageInput = () => {
    const [text,setText] = React.useState("");
    const [imagePreview,setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage,sendingMessage} = useChatStore();
   

    const handleImageChange = (e) =>{
        const file = e.target.files[0];
       
        if(!file.type.startsWith("image/")){
           return toast.error("Please select an Image file")
        }
  
        const reader = new FileReader();
        reader.onload =  ()=> {
                setImagePreview(reader.result)
        };
        reader.readAsDataURL(file)

    }

    const removeImage = (e)=>{
        setImagePreview(null);
        if(fileInputRef.current){
            fileInputRef.current.value = ""; // input tag value null ( file )
        };
    }

    const handleSendMessage = async (e)=>{
        e.preventDefault(); // to not to refresh

        if(!text.trim() && !imagePreview) return;

        try{
            await sendMessage({
                text: text.trim(),
                image:imagePreview,
            });

            setText(""); // clear form
            setImagePreview(null);
            if(fileInputRef.current) {fileInputRef.current.value="";}
        }catch(error){
            console.log("failed to send message",error);
        }
    }
  return (
    <>
      {imagePreview && (
        <div className="absolute bottom-20 left-4 z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
         <button className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors" onClick={removeImage}>
              <X className="w-3 h-3" />
         </button>
       <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
      </div>
      )}
      
      <form onSubmit={handleSendMessage} className="min-h-[65px] h-[10vh] w-full bg-white border-t border-gray-200 flex items-center gap-3 px-4 absolute bottom-0">
     
        <div className="flex-1 flex items-center">
           <input 
             type="text" 
             className="w-full h-10 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 text-sm placeholder-gray-500" 
             name="text" 
             placeholder="Type a message..." 
             autoComplete="off" 
             onChange={(e)=>{setText(e.target.value)}} 
             value={text}
           />
        </div>
        
        <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleImageChange}/>
        
        <button 
          type="button" 
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${imagePreview ? 'bg-green-100 text-green-600' : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`} 
          onClick={()=> fileInputRef.current?.click()}
        >
               <Image className="w-5 h-5"/>
        </button>
    
        <button 
          type="submit"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${text.trim() ? "bg-black text-white hover:bg-gray-800" : "bg-gray-100 text-gray-400"}`}
        >
            {sendingMessage ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
        </button>
      </form>
    </>
  )
}

export default MessageInput
