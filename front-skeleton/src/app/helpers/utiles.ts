// Convertir un fichier en Blob
export function fileToBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          const arrayBuffer = reader.result;
          const blob = new Blob([arrayBuffer]);
          resolve(blob);
        } else {
          reject(new Error('Failed to read file as ArrayBuffer.'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

 export function blobToUrl(blob: Blob): string {
    const url = URL.createObjectURL(blob);
    return url;
}

export function removePluralSuffix(str: string): string {
  if (str.endsWith('s')) {
      return str.slice(0, -1); // Retourne la chaîne sans le dernier caractère
  } else {
      return str; // Retourne la chaîne inchangée si elle ne se termine pas par 's'
  }
}

