import './LoadingSpinner.css';

export const LoadingSpinner = ({className=''}: {className?: string}) => {
    return (
        <div className={`${className} lds-spinner`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};