import { useEffect, useState } from "react";

const useResize = (initialItemsPerPage) => {
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1380) {
                setItemsPerPage(10);
            } else if (window.innerWidth >= 1165) {
                setItemsPerPage(8);
            } else if (window.innerWidth >= 930) {
                setItemsPerPage(6);
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(5);
            } else if (window.innerWidth >= 525) {
                setItemsPerPage(4);
            } else if (window.innerWidth >= 425) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 375) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return itemsPerPage;
}

export default useResize