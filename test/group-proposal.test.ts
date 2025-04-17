import {Exec, MsgSubmitProposal} from "../lib/proto/cosmos/group/v1/tx_pb";
import {MsgSend} from "../lib/proto/cosmos/bank/v1beta1/tx_pb";
import {Coin} from "../lib/proto/cosmos/base/v1beta1/coin_pb";
import {Any} from "google-protobuf/google/protobuf/any_pb";
import 'regenerator-runtime/runtime';
import {
    buildMessage,
    createAnyMessageBase64,
    TYPE_NAMES_READABLE_MAP
} from "../lib";
import * as google_protobuf_any_pb
    from "google-protobuf/google/protobuf/any_pb";
import {Message} from "google-protobuf";
import {
    MarkerTransferAuthorization
} from "../lib/proto/provenance/marker/v1/authz_pb";
import {MsgGrant} from "../lib/proto/cosmos/authz/v1beta1/tx_pb";
import {Grant} from "../lib/proto/cosmos/authz/v1beta1/authz_pb";

describe(`test build group proposal`, () => {
    const expectedB64 = "CiIvY29zbW9zLmdyb3VwLnYxLk1zZ1N1Ym1pdFByb3Bvc2FsEp0CCj10cDEycWxuODJkZTU5eWc3ajRlMDI5emQzM2pkaDVzMmw1d244NnpwanVxMHdrOWMwNmY4NzZxemtmN2UyEil0cDF5cnRjaHQ5MGt2c2NjNzk2YWRhajd2aHI3NDI5NXRlcWE2cXNyMhoRa2ljayBhc3MgcHJvcG9zYWwimwEKHC9jb3Ntb3MuYmFuay52MWJldGExLk1zZ1NlbmQSewo9dHAxMnFsbjgyZGU1OXlnN2o0ZTAyOXpkMzNqZGg1czJsNXduODZ6cGp1cTB3azljMDZmODc2cXprZjdlMhIpdHAxdnhsY3hwMnZqbnlqdXc2bXFuOWQ4Y3E2MmNldTZsbGxwdXNoeTYaDwoFbmhhc2gSBjEwMDAwMCgB";
    const grp = "tp12qln82de59yg7j4e029zd33jdh5s2l5wn86zpjuq0wk9c06f876qzkf7e2";
    const proposer = "tp1yrtcht90kvscc796adaj7vhr74295teqa6qsr2";
    const to = "tp1vxlcxp2vjnyjuw6mqn9d8cq62ceu6lllpushy6";
    const amt = "100000";

    it(`should build group proposal`, () => {
        let msgSendCoin = new MsgSend()
            .setToAddress(to)
            .setFromAddress(grp);
        msgSendCoin.addAmount(
                new Coin().setAmount(amt).setDenom("nhash")
            );
        let msgSendCoinAny = new Any();
        msgSendCoinAny.pack(msgSendCoin.serializeBinary(), TYPE_NAMES_READABLE_MAP.MsgSend, "/");

        let msgSubmitProposal = new MsgSubmitProposal()
            .setExec(
                Exec.EXEC_TRY
            )
            .setMetadata("kick ass proposal")
            .setGroupPolicyAddress(grp);
        msgSubmitProposal.addProposers(proposer)
        msgSubmitProposal.addMessages(msgSendCoinAny)

        let m = createAnyMessageBase64('MsgSubmitGroupProposal', msgSubmitProposal);
        expect(m).toEqual(expectedB64);
    });

    it(`should build group proposal with buildMessage`, () => {
        const sendMessage = {
            fromAddress: grp,
            toAddress: to,
            amountList: [{ denom: 'nhash', amount: amt }],
        };
        const msgSend = buildMessage('MsgSend', sendMessage)!;
        let msgSendAny = new Any();
        msgSendAny.pack(msgSend.serializeBinary(), TYPE_NAMES_READABLE_MAP.MsgSend, "/");

        const groupProposal = {
            title: "kick ass title",
            summary: "kick ass summary",
            groupPolicyAddress: grp,
            proposersList: [proposer],
            metadata: "kick ass proposal",
            messagesList: [msgSendAny.toObject()],
            exec: Exec.EXEC_TRY
        }

        const msgSubmitProposal = buildMessage('MsgSubmitGroupProposal', groupProposal);
        let m = createAnyMessageBase64('MsgSubmitGroupProposal', msgSubmitProposal as Message);
        expect(m).toEqual(expectedB64);

    });

    it(`should build authz grant with buildMessage`, () => {

        const markerAuth = new MarkerTransferAuthorization();
        const coin = new Coin();
        coin.setAmount(amt);
        coin.setDenom('cusd.deposit');
        markerAuth.addTransferLimit(coin);
        const markerAuthAny = new Any();
        markerAuthAny.pack(markerAuth.serializeBinary(), TYPE_NAMES_READABLE_MAP.MarkerTransferAuthorization, "/");

        const grant = new Grant();
        grant.setAuthorization(markerAuthAny);
        const mg = new MsgGrant();
        mg.setGrant(grant);
        mg.setGrantee(to);
        mg.setGranter(proposer);
        let m = createAnyMessageBase64('MsgGrant', mg as Message);

    });

});
