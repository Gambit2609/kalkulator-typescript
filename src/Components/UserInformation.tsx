import React from 'react'

export function UserInformation({description, additionalClassName}:{description:string, additionalClassName:string}) {
    return (
        <>
            <div className="userInfoIcon">
                <input type="image" src='/Images/information1.png' alt='description'/>
            </div>
            <div className={`userInfoDescription ${additionalClassName}`}>
            {description}
            </div>
        </>
    )
}
