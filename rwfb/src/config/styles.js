const tailw = {
    // capt background image
    bg: [
        'w-full h-screen bg-center bg-cover bg-capt'
    ].join(' '),

    // centering login and signup form
    form: [
        'h-screen flex items-center justify-center',
    ].join(''),

    // the insides of the form
    forms: [
        'max-w-[600px] mx-auto my-16 p-4 border p-2 bg-zinc-300 bg-opacity-90',
    ].join(''),

    button: [
        'border-red-500 bg-red-600 text-white rounded ', 
        'transition duration-700 hover:bg-red-900 hover:scale-110 w-full p-3 my-2 ',
    ].join(''),

    
};
export default tailw;

/*
form: [
        
    ].join(''),
*/