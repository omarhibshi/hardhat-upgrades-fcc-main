const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    const proxyBoxV1 = await ethers.getContractAt(
        "Box",
        transparentProxy.address
    )
    const versionV1 = await proxyBoxV1.version()
    //console.log(`BoxV1 is now at version ${versionV1}`)
    console.log(versionV1)

    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(
        transparentProxy.address,
        boxV2.address
    )
    await upgradeTx.wait(1)
    //

    // Get the BoxV2 abi and load them up at the transparentPrxy address
    const proxBoxV2 = await ethers.getContractAt(
        "BoxV2",
        transparentProxy.address
    )
    const versionV2 = await proxBoxV2.version()
    //console.log(`BoxV2 is now at version ${versionV2}`)
    console.log(versionV2)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
