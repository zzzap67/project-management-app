// import React, { useContext, useEffect, useState } from 'react';
// import { Navigate, Outlet, useNavigate } from 'react-router-dom';
// // import Index from '../Index/Index';
// // import mainApi from '../../utils/MainApi';
// // import constants from '../../utils/constants';
//
// function Index({ redirectPath = '/' }) {
//   const [showPreloader, setShowPreloader] = useState(true);
//   const { user, setUser } = useContext(CurrentUserContext);
//   const { setTooltip } = useContext(InfoTooltipContext);
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     (async () => {
//       try {
//         if (!user.email) {
//           const token = localStorage.getItem(constants.STORAGE.JWT);
//           if (token) {
//             const userInfo = await mainApi.getUserInfo(token);
//             setUser(userInfo);
//           }
//           setShowPreloader(false);
//         }
//       } catch (e) {
//         switch (e.message) {
//           case '401': {
//             setTooltip({
//               message: constants.MESSAGE.NO_TOKEN,
//               type: constants.MESSAGE_TYPE.ERROR,
//             });
//             break;
//           }
//           default: {
//             setTooltip({
//               message: constants.MESSAGE.SERVER_ERR,
//               type: constants.MESSAGE_TYPE.ERROR,
//             });
//           }
//         }
//         setTimeout(() => {
//           localStorage.clear();
//           navigate('/', { replace: true });
//         }, 3000);
//       }
//     })();
//   }, []);
//
//   if (user.email) {
//     return <Outlet />;
//   }
//
//   if (showPreloader) {
//     return <Preloader />;
//   }
//
//   return <Navigate to={redirectPath} replace />;
// }
//
// export default Index;
