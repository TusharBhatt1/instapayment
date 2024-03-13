export default async function useFetch(url: string) {
    try {
        const res = await fetch(url);
        const finalRes = await res.json();
    
        return {
          success: true,
          data: finalRes,
        };
      } catch {
        return {
          success: false,
          data: []
        
        };
      }

}
