import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// Archivos

export const RUTAPRODUCTOS = __dirname + "/../db/productos.txt";
export const RUTACARRITOS = __dirname + "/../db/carritos.txt";

// Firebase

export const firebaseConnect = () => {
  const serviceAccount: ServiceAccount = {
    projectId: "coder-backend-562ea",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDjxRD7ELF/UvmZ\nIpo2SNgtl7bD4MX2ioVkw36HD/SztvsxhzxsyOWXF+wiYPLuVmT9AwFNz04wdKQP\n7Q3vv+0fhA93ZJqBAY7Wz3W5RNEZ9QcQU8Pbi/uiyj+hV12HaVSdoQBDLyN11qSt\nkIHfMH0HQPPDyengZaxFoKXfZWKWeWu92lNYkJY4f7sFdzKdOroqOHEmzMgvBDzl\n9OpCl8JkV/6AePj/KBNksfwJ90aJQK0PgNvwOAnggFHadt4egouvrMAbGE8BmiGi\nlFwGM1AXJ+qU3vapXIG+PBfzdWSHFhOf8ldp7ePBEOR3zwi07MNo+qDW7p/dmzal\nv6lXhvGvAgMBAAECggEAcUO4NAGTIqvSbzJj2YbT6ag+PJ30E6vCtd75dpSarRvb\nQj/r7nTgpwhAZsArThYsVh0+csEaMsJuK3VIruaUNk3nmwmuQ2TQ8UVtV1o/WVcd\n0iK1jOHJmqRUjBjz67iXWWOMy9wPGDRK4/yueJyWMBs+nSg1Y19sEZvXoIW8RvLe\nRUD0FbNe8+0aMLmsPffs2bXnrmhRwuVgeSbj7K5thCiMrjAhC648Rk+TioAs08hC\nM+4tXXK2rr9MCQ9+0jbUUMHTpkkc70qt3ozzR/yEYYGKwq7T7VNBeC3oxoiJLe4/\nEeGuP42jP9OfJQlg761QpsukVOlgAvU3PGZVz8PdcQKBgQD3Ka1piTPbZFh5AJfm\n4wLPKS6jRaameJnSFT1JrRTC1o58sBDJn3XOy5iTgrKIMjIGwlxs8LewetnctS1S\nHi31JTOQi4aIVcMni178PVE7KcrHpeVLcIQAMPFTvPNZjNBeL7FGCYa4F80ob0eA\noHky/cdDHc7wmRZ0C+XmWh4KIwKBgQDr6eGmeGjmcjbznC37NvkR9/OoTEMVozFo\nzNuIXK9EuM0xQunNJ32LXmwb1HSmTbd9H4A0Bj2QQwZY7VSrtQCIl+eUQ2JON4X/\nJ8rL6V+q1ch/s4fTsND5fTWk7h7BeyIN2vPx3h44nFgGTn/JXSAfukS7npdf3W7z\n4yiQJoK1BQKBgQCYerbH5+P9El/ebnZH8361LPPfuEWCZ96Fk6LWxBeNx+3pkHka\n2exE4qfDQRtBGK5yKw/4CV1ZW8Dx/zfxdDroBMZWAy3BCB+4UqwLswxdEoBOQNM/\ngi99KrSG84exlESsBoI38gKRqeVgb55OBTIgOh3nEwmqttb6SqjPPoNPvwKBgH5y\nWo82pMs31rpWMNMgkPmPlBrV3XMgiGAqxVRekVbdUqYfvl9G1mS4FGwKQQfOShYX\np0i7O44yTpmlg6eRGZsdCHQQdgWEfx7W/jyzdqKDebbwzFGrySagdPtU4klELWmN\nvQkby8j+C7Q9qQKOFqTK2wJRK8OnVUwFqn0xFwfdAoGBAK0vjQr+LZMRUE+JSuJW\niv2Pv8xQ2lHjep+UHJy92xwrFXbWq06HOTiNNAAwqxQ8Qgsh3uWdKQcx8BevQ3jg\nTXwgS50BfZroWFHPasEJ9/c8U8cLPS6iR/a29GfstgBv+sHJNNObifH3RjlVLzDd\nGRmk4oW8L5X721aI0Nyt+/wg\n-----END PRIVATE KEY-----\n",
    clientEmail:
      "firebase-adminsdk-vq044@coder-backend-562ea.iam.gserviceaccount.com",
  };
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return getFirestore();
};

// Mongo

export const URLMONGO: string = "mongodb://localhost:27017/ecommerce";
