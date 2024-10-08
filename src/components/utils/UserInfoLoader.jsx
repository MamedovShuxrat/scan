import React from 'react';
import ContentLoader from "react-content-loader";

const UserInfoLoader = () => (
    <ContentLoader
        speed={1}
        width={157}
        height={31}
        viewBox="0 0 157 31"
        backgroundColor="#7ce3e1"
        foregroundColor="#029491"
    >
        <rect x="11" y="5" rx="3" ry="3" width="120" height="6" />
        <circle cx="586" cy="240" r="49" />
        <rect x="140" y="5" rx="2" ry="2" width="15" height="7" />
        <rect x="140" y="23" rx="2" ry="2" width="15" height="7" />
        <rect x="11" y="23" rx="3" ry="3" width="120" height="6" />
    </ContentLoader>
);

export default UserInfoLoader;