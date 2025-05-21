// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
const HOST_URI: string = import.meta.env.VITE_VERXID_FACE_URI;

if (typeof window === "object") {
  const customverxidPopupStyle: HTMLStyleElement = document.createElement("style");
  customverxidPopupStyle.type = "text/css";
  customverxidPopupStyle.innerHTML = `
    .verxidPopHolder {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 999999999999999;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
      border: none;
      overflow: auto;
    }
  
    .closeButton {
      cursor: pointer;
      height: 26px;
      width: 26px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.4);
      margin-left: 5px;
      margin-top: -26px;
    }
  
    .closeButtonContainer {
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  
    .loader {
      z-index: 9999999999999991;
      position: fixed;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fafafa;
      border-radius: 50%;
      width: 2em;
      height: 2em;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  
    .verxidPopFrame {
      width: 100%;
      height: 100%;
      max-width: 90%;
      max-height: 90%;
      z-index: 9999999999999992;
      overflow: auto;
      border: 0;
      border-radius: 5px;
    }
  
    @media only screen and (max-width: 600px) {
      .verxidPopFrame {
        max-width: none;
        max-height: none;
        border-radius: 0;
      }
      .closeButton {
        display: none;
      }
    }
  `;
  
  document.getElementsByTagName("head")[0].appendChild(customverxidPopupStyle);
}

function removeElement(i: HTMLElement | null): void {
  i?.parentNode?.removeChild(i);
  i?.remove();
}

class VerxidPopupSetup {
  private isCameraGranted: boolean = false;
  private customEventHandler = (e: MessageEvent): void => {
    this.handleLivenessPostMessage(e);
  };

  constructor(e: {
    callback?: (data: unknown) => void;
    onClose?: () => void;
  }) {
    this.finalCallback = e.callback || this.log;
    this.onPopupClosed = e.onClose || this.log;
  }

  init(): void {
    this.clearMessageListener();
    this.startup();
  }

  private startup(): void {
    this.setup();
    this.startExpress();
  }

  private clearMessageListener(): void {
    window.removeEventListener("message", this.customEventHandler);
  }

  private addMessageListener(): void {
    window.addEventListener("message", this.customEventHandler);
  }

  private log(e: unknown): void {
    console.log(e);
  }

  private createCoreElements(): void {
    this.frameHolder = window.document.createElement("div");
    this.frameHolder.className += " verxidPopHolder";

    this.verxidPopFrame = window.document.createElement("iframe");
    this.verxidPopFrame.className += " verxidPopFrame";
    this.verxidPopFrame.setAttribute("allow", "camera *;microphone *");

    this.closeButton = window.document.createElement("span");
    this.closeButton.className += " closeButton";
    this.closeButton.innerHTML = `
      <svg width='14' height='13' viewBox='0 0 14 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M3.5 9.75L10.5 3.25' stroke='white' stroke-linecap='round' stroke-linejoin='round'/>
        <path d='M10.5 9.75L3.5 3.25' stroke='white' stroke-linecap='round' stroke-linejoin='round'/>
      </svg>`;

    const closeHandler = (n: Event) => {
      n.preventDefault();
      this.closePopup();
    };

    this.closeButton.removeEventListener("click", closeHandler);
    this.closeButton.addEventListener("click", closeHandler);

    this.buttonContainer = window.document.createElement("div");
    this.buttonContainer.className += " closeButtonContainer";
    this.buttonContainer.appendChild(this.closeButton);

    this.lazyLoader = window.document.createElement("div");
    this.lazyLoader.className += " loader";
  }

  private setup(): void {
    this.addMessageListener();
  }

  private startExpress(): void {
    this.createCoreElements();
    this.frameHolder.appendChild(this.lazyLoader);
    this.frameHolder.appendChild(this.verxidPopFrame);
    this.frameHolder.appendChild(this.buttonContainer);
    this.verxidPopFrame.src = `${HOST_URI}`;
    this.verxidPopFrame.addEventListener("load", () => {
      removeElement(this.lazyLoader);
    });
    document.body.appendChild(this.frameHolder);
  }

  closePopup(): void {
    console.log("popup closed ==>");
    removeElement(this.frameHolder);
    this.onPopupClosed();
    this.clearMessageListener();
  }

  private handleLivenessPostMessage(e: MessageEvent): void {
    this.finalCallback(e.data);
  }
}

export default VerxidPopupSetup;