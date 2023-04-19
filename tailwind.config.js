module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
          textColor: {
            primary: "rgb(34 197 94)",
        },
        },
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                ".buttonHome": {
                    "@apply text-2xl bg-green-600 hover:bg-green-800 md:hover:scale-110 transition text-white py-5 px-12 rounded-full":
                        {},
                },
                ".navbarItem": {
                    "@apply text-lg hover:scale-110 transition cursor-pointer text-slate-200 hover:text-green-200":
                        {},
                },
            })
        },
    ],
}
