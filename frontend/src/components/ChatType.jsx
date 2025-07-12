import React, { useRef, useState } from "react";
import { usePersStore } from "../store/usePersStore";
import { useGroupStore } from "../store/useGroupStore";
import { X, CameraIcon, Send } from "lucide-react";

const ChatType = () => {
  const { activeTab, chosenUser ,sendPersMsg} = usePersStore();
  const { viewOtherGroups,sendGroupMsg,chosenGroup } = useGroupStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageIn = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result;
        setImage(base64);
      };
    }
  };
  const removeImage = async () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(activeTab=="contacts"){
      await sendPersMsg(chosenUser._id,{text,image});
    }
    if(activeTab=="groups"){
      await sendGroupMsg(chosenGroup._id,{text,image});
    }
    console.log({text,image});
    setText("");
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };




  return (
    <div className="w-full bg-base-300 pt-3 border-t border-b border-base-content px-4 py-4">
      {image && (
        <div className="relative w-16 h-16 mb-1">
          <img src={image} className="w-full h-full rounded-md object-cover" />
          <button
            onClick={removeImage}
            className="absolute top-0 right-0 bg-base-100 rounded-full p-[2px]"
          >
            <X className="text-base-content size-4" />
          </button>
        </div>
      )}
      {(activeTab == "contacts" ||
        (activeTab == "groups" && viewOtherGroups == false)) && (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 h-10 bg-base-100 rounded-lg border border-base-content px-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
            onChange={handleImageIn}
          />
          <button  type="button"
           onClick={() => inputRef.current?.click()}
           className="w-10 h-10 bg-base-100 rounded-full border border-base-content flex items-center justify-center">
            <CameraIcon
              className={`size-6 ${image ? "text-green-500" : "text-base-content"}`}
             
            />
          </button>
          <button
            type="submit"
            className={`w-10 h-10 bg-base-100 rounded-full border border-base-content flex items-center justify-center ${!text && !image ? "text-base-200" : "text-base-content"}`}
            onClick={handleSubmit}
            disabled={!text && !image}
          >
            <Send className={`size-6 ${!text && !image ? "text-base-200" : "text-base-content"}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatType;
