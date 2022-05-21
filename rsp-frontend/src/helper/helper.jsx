import toast from "react-hot-toast";

export const handleError = () => alert('Something went wrong');

export const errorToast = (message) =>{
    toast.error(message, {
        position: "top-right",
        style: {
        padding: '16px',
        color: 'white',
        background: '#FF0000'
        },
        iconTheme: {
        primary: 'red',
        secondary: '#FFFAEE',
        },
    });
}

export const successToast = (message) =>{
    toast.success(message, {
        position: "top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'white',
          background: '#4BB543'
        },
        iconTheme: {
          primary: 'green',
          secondary: '#FFFAEE',
        },
    });
}
    
    