type DeviceInfo = {
  agent: string;
  isMobileDevice: boolean;
};

const IsDevice = (): DeviceInfo => {
  if (typeof navigator === 'undefined') {
    // Provide default implementations that return null or false
    return {
      agent: '',
      isMobileDevice: false,
    };
  }

  const ua = navigator.userAgent;
  const Android = ua.match(/Android/i);
  const BlackBerry = ua.match(/BlackBerry/i);
  const IEMobile = ua.match(/IEMobile/i);
  const iOS = ua.match(/iPhone|iPad|iPod/i);
  const iPAD = !!(ua.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  const OperaMini = ua.match(/Opera Mini/i);

  return {
    agent: ua,
    isMobileDevice:
      (Android?.length || 0) > 0 ||
      (BlackBerry?.length || 0) > 0 ||
      (IEMobile?.length || 0) > 0 ||
      iPAD ||
      (iOS?.length || 0) > 0 ||
      (OperaMini?.length || 0) > 0,
  };
};

export default IsDevice;
