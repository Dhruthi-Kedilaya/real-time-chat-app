import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { theme } from "../theme/theme";

const SettingsPage = () => {
  const { themes, setThemes } = useThemeStore();
  return (
    <div className="pl-12 w-full mt-2 bg-base-200 px-4 pt-20">
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl text-center font-semibold">Theme</h2>
          <p className="text-md text-center text-base-content/70">
            Select the theme of your choice
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 mb-2 pb-4">
          {theme.map((test, i) => (
            <button
              key={i}
              className={`${
                themes == test
                  ? "bg-base-300 rounded-md border-4 border-base-content "
                  : "hover:bg-base-300 hover:rounded-md"
              }`}
              onClick={() => setThemes(test)}
            >
              <div
                className="relative h-10 w-full rounded-md overflow-hidden"
                data-theme={test}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {test.charAt(0).toUpperCase() + test.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-xl">
          Preview of your chat according to your selected theme
        </p>
        <div className="w-full mt-1 flex justify-center bg-base-200">
          <div className="border border-primary rounded-xl p-8 bg-base-100">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={"./blankProfile.png"}
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">Hey! How’s your day going?</div>
            </div>

            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={"./blankProfile.png"}
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">
                Pretty good! Just working on that new project we discussed. You?
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={"./blankProfile.png"}
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">
                Same here. Also, did you check out the new Tailwind update? It’s
                awesome!
              </div>
            </div>

            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={"./blankProfile.png"}
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">
                Yess! I just updated it last night. Can’t wait to try out the
                new utilities. 🔥
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={"./blankProfile.png"}
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">
                By the way, we need to finalize the UI for the chat screen.
                Let’s keep it clean and minimal?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
