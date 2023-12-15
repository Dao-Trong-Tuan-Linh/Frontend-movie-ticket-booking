"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../redux/store';

const useAdminCheck = (pathname:string) => {
    console.log(pathname)
  const router = useRouter();
  const result = useAppSelector((state) => state.auth);
  const { dataAuth, error } = result;

  useEffect(() => {
    if (!dataAuth.token || dataAuth.user?.role != 1) {
      router.push("/admin/login");
    } else if(dataAuth.token || dataAuth.user?.role == 1) {
        router.push(pathname);
    }
  }, [dataAuth]);
};

export default useAdminCheck;