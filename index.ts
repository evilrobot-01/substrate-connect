import { ScProvider, WellKnownChain } from "@polkadot/rpc-provider/substrate-connect";
import { ApiPromise } from "@polkadot/api";

window.onload = () => {
    void (async () => {
        try {
            const provider = new ScProvider(WellKnownChain.polkadot);

            await provider.connect();
            const api = await ApiPromise.create({ provider });
            await api.rpc.chain.subscribeNewHeads(
                (lastHeader: { number: unknown; hash: unknown }) => {
                    console.log(
                        `New block #${lastHeader.number} has hash ${lastHeader.hash}`
                    );
                }
            );
        } catch (error) {
            console.error(<Error>error);
        }
    })();
};