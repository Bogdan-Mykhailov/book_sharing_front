import { useEffect } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';

type NotificationType = 'success' | 'error';

const SUCCESS = 'Success';
const ERROR = 'Error';

export const useNotificationAndNavigate = (
  isSuccess: boolean,
  isError: boolean,
  errorMessage: FetchBaseQueryError | SerializedError | undefined,
  successMessage = '',
  url?: string,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      openNotification('error', errorMessage);
    }
    if (isSuccess) {
      openNotification('success');
      url && navigate(url);
    }
  }, [isError, isSuccess]);

  const openNotification = (type: NotificationType, error?: any) => {
    notification[type]({
      message: `${type === 'success' ? SUCCESS : ERROR}`,
      description: `${type === 'success' ? `${successMessage}` : error.data?.message}`,
    });
  };
};
