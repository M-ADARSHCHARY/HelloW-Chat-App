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
      {imagePreview ? (<div  className="h-20 w-20 rounded-md absolute bottom-5 z-20">
         <button className="absolute top-0 right-0 h-fit w-fit bg-black rounded-full p-1" onClick={removeImage}>
              <X size={15} />
         </button>
       <img src={imagePreview} alt="Preview"className="h-20 w-20 rounded-md"  />
      </div>):""}
      <form onSubmit={handleSendMessage}className="min-h-[65px] h-[10vh] w-full bg-black flex items-center justify-between absolute bottom-0">
     
    <div className="h-full w-fit md:w-[85%]  flex items-center">
       <input type="text" className="w-full h-[70%] rounded-md md:ml-2 mr-1 text-center focus:outline-none" name="text" placeholder='send a message' autoComplete="off" onChange={(e)=>{setText(e.target.value)}} value = {text}/>
    </div>
    
        <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleImageChange}/>
       <button type="button" className={`size-5 btn btn-circle ${imagePreview ? 'text-emerald-500' : "text-zinc-400"}`} onClick={()=> fileInputRef.current?.click()}>
               <Image className="w-5 h-5"/>
       </button>
    
    <button className="p-2 hover:bg-gray-200 rounded mr-2" >
        {sendingMessage ? (<Loader2 className="size-10 animate-spin"/>) :<Send className={`w-5 h-5 ${text ? "text-blue-600" : "text-blue-100" }`} />}
    </button>
</form>
    </>
  )
}

export default MessageInput
