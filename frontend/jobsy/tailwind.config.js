module.exports = {
    content: [
        "app/**/*.{js,ts,jsx,tsx}/.",
        "components/**/*.{js,ts,jsx,tsx}/."
    ],
    theme:{
        extend:{
            keyframes:{
                fadeUp:{
                    '0%':{
                        opacity:'0',
                        transform: 'translateY(40px)'
                    }
                    ,
                    '100%':{
                        opacity:'1',
                        transform:'translateY(0)'
                    },
                },
                amimation:{
                        fadeUp:'fadeUp 0.7s ease-out forwards'
                    }
                
            },
            
        }
    },
    plugins:[]
}