import React, {useRef, useState, useEffect} from 'react';

const UserLayout = () => {
  const [page, setPage] = useState(1);
  const page1 = useRef(null);
  const page2 = useRef(null);
  const page3 = useRef(null);

  useEffect(() => {
    if (page === 1) {
      page1.current.style.display = 'block';
      page2.current.style.display = 'none';
      page3.current.style.display = 'none';
    } else if (page === 2) {
      page1.current.style.display = 'none';
      page2.current.style.display = 'block';
      page3.current.style.display = 'none';
    } else if (page === 3) {
      page1.current.style.display = 'none';
      page2.current.style.display = 'none';
      page3.current.style.display = 'block';
    }
  }, []);

  return (
    <div>
      <form enctype="multipart/form-data">
        <div ref="page1">
          <input type="file" accept="image/*" multiple/>
        </div>
        <div ref="page2">
          <textarea name="description" id="" cols="30" rows="10"></textarea>
          <button></button>
        </div>
        <div ref='page3'>
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  );
};

export default UserLayout;