import React from "react";
import ReactDom from "react-dom";

function InstallDom() {
  const [state, setState] = React.useState(false);
  const [evt, setEvt] = React.useState(undefined);
  let deferredInstallPrompt;

  window.addEventListener("beforeinstallprompt", e => {
    deferredInstallPrompt = e;
    setEvt(e);
    setState(true);
  });
  window.addEventListener("appinstalled", e => {
    console.log(`App was installed ${e}`);
  });

  const dom = (
    <div id="install-prompt-wrap">
      {state ? (
        <button
          onClick={() => {
            console.log(evt);
            evt.prompt();

            evt.userChoice.then(choice => {
              if (choice.outcome === "accepted") {
                console.log("User accepted the A2HS prompt", choice);
              } else {
                console.log("User dismissed the A2HS prompt", choice);
              }

              setEvt(null);
            });
          }}
        >
          install
        </button>
      ) : (
        ""
      )}
    </div>
  );

  return ReactDom.createPortal(dom, document.querySelector("#prompt-warp"));
}

export default InstallDom;
