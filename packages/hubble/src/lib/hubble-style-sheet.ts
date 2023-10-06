const styleSheetId='__hubble-stylesheet';

export const insertHubbleStyleSheet=()=>{
 //__hubble-scroll-bars
    if(document.getElementById(styleSheetId)){
        return;
    }

    const style=document.createElement('style');
    style.id=styleSheetId;
    style.innerHTML=/*css*/`

        .__hubble-scroll-bars::-webkit-scrollbar {
            display: block;
            width: 16px;
        }

        .__hubble-scroll-bars::-webkit-scrollbar-button {
            display: none;
        }

        .__hubble-scroll-bars::-webkit-scrollbar-track {
            background-color: #99999900;
        }

        .__hubble-scroll-bars::-webkit-scrollbar-track-piece {
            background-color: #99999900;
        }

        .__hubble-scroll-bars::-webkit-scrollbar-thumb {
            background-color: #99999900;
            border: 5px solid transparent;
            border-radius: 8px;
            box-shadow: 4px 0px 0px 4px #99999960 inset;
        }

        .__hubble-scroll-bars::-webkit-scrollbar-thumb:hover {
            box-shadow: 4px 0px 0px 4px #99999990 inset;
        }
    `

    document.head.appendChild(style);
}
