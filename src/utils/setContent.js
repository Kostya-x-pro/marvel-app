import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';
import Skeleton from '../components/skeleton/Skeleton';

export const setContent = (process, Component, data) => {
  switch(process) {
      case 'waiting':
          return <Skeleton/>
      case 'loading':
          return <Spinner/>
      case 'confirmed':
          return <Component data={data} />;
      case 'error':
          return <ErrorMessage/>
      default: 
          throw new Error('Unexpected process state');
  }
}

export const setContentWithNewLoadingData = (process, Component, newItemData) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemData ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>
        default: 
            throw new Error('Unexpected process state');
    }
}