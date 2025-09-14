import { writable, type Writable } from "svelte/store";
import { trpc } from '$lib/trpc';

export type DataSource = {
    type: "websocket" | "rest";
    endpoint: string;
    refreshInterval?: number; // used only for REST type
    params?: Record<string, any>;
}

export interface DataConnection {
    unsubscribe(): void;
    store: Writable<any>;
}

export class DataService {
    private connections: Map<string, DataConnection> = new Map();

    connect(widgetId: string, source: DataSource): Writable<any> {
        this.connections.get(widgetId)?.unsubscribe();
        let unsubscribe = () => {};
        let store: Writable<any> = writable(null);

        if(source.type === "websocket") {
            store = writable(null);
            unsubscribe = this.connectWebsocket(store, source.endpoint, source.params);
        }
        else if(source.type === "rest") {
            console.log("REST data source not implemented yet");
        }

        this.connections.set(widgetId, {
            unsubscribe,
            store
        })

        return store;
    }

    connectWebsocket(store: Writable<any>, endpoint: string, sourceParams?: Record<string, any>): () => void {
        const subscription = (trpc as any)[endpoint].subscribe(sourceParams?.input, {
            onData(data: any) {
                store.set(data.value);
            },
            onError(error: any) {
                console.error(`WebSocket error on ${endpoint}:`, error);
            }
        });

        return () => subscription.unsubscribe();
    }

    disconnect(widgetId: string) {
        this.connections.get(widgetId)?.unsubscribe();
        this.connections.delete(widgetId);
    }

    disconnectAll() {
        this.connections.forEach(conn => conn.unsubscribe());
        this.connections.clear();
    }
}

export const dataService = new DataService();
