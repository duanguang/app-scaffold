import {MlsHome} from './../src/containers/home/mlsHome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BarCodeReadEvent} from 'react-native-camera';

declare type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    UserInfo: undefined;
    Demo: undefined;
    Camera: {onGoBack: (event?: BarCodeReadEvent) => void};
    ReceiptTab: {
        /** 收货状态 */
        status?: number;
    };
    ReceiptDetail: undefined;
    ReceiptOperate: undefined;
    ReceiptLaunch: undefined;
    OrderDetail: undefined;
    PutOnList: undefined;
    ContainerDetail: undefined;
    ShelveList: {
        type?: number;
    };
    ShelveDetail: {
        storageContainerTypeName?: string;
        loadingQTY?: number;
        warehouseName?: string;
        storageContainerCode?: string;
        id?: number;

        storageId?: number;
        warehouseStorageItemNo?: string;
        goodsId?: string;
    };
    Picking: {
        /** 拣货清单ID */
        id?: number;
    };
    PickingDetail: {
        /** 拣货清单ID */
        id?: string;
        /** 仓储工单号 */
        warehouseStorageItemNo?: string;
        /** 是否操作 */
        operate: boolean;
        /** 是否初始化 */
        initial?: boolean;
    };
    PickingOperate: {
        /** 拣货清单号 */
        pickingTaskNo?: string;
        /** 商品id */
        goodsId: string;
        /** 拣货任务ID */
        pickingTaskId?: string;
        /** 商品名称 */
        goodsName?: string;
        /** 商品编码 */
        goodsNumber?: string;
        /** 商品计划拣货量 */
        planPicking?: number;
        /** 已拣货量 */
        realityPicking?: number;
        /** 型号 */
        goodsCode: string;
        /** 条码 */
        goodsModel?: string;
        /** 详情id */
        pickingDetailId?: string;
        /** 批次号 */
        batchNumber?: string;
        /** 商品属性 残次品 === 2  */
        goodsStatus?: number | null;
    };
    WarehouseOut: {
        /** 入库单号 */
        itemNo?: string;
        /** 出库状态 */
        status?: number;
    };
    WarehouseOutDetail: {
        /** 入库单号 */
        itemNo: string;
        /** 是否操作页面 */
        operate: boolean;
    };
    InventoryTab: undefined;
    InventoryDetail: undefined;
    StorageDetail: undefined;
    WarehouseShift: {};
    ShiftOut: {
        /** 类型 */
        type: 'container' | 'bulk';
    };
    ShiftIn: {
        /** 类型 */
        type: 'container' | 'bulk';
    };
    Shifting: {};
    MlsHome: undefined;
    Prepare: undefined;
    CallMaterial: undefined;
    PrepareSuccess: undefined;
    PrepareRack: {
        /** 货架条码 */
        shelfOccupancy: string;
        /** 库位编码 */
        storageLocation: string;
    };
    CallMaterialSuccess: undefined;
    TaskManagement: undefined;
    TaskManagementDetail: {
        id: number;
    };
    EntityShelfReturn: undefined;
    NoContainerIn: undefined;
    NoContainerOut: undefined;
    NoContainerSuccess: {
        stockIn: boolean;
    };
    UnbindMaterials: undefined;
    QualityCheckList: undefined;
    QualityCheckDetail: {
        id: string;
        type: number;
    };
    QualityCheckResult: {
        batchNumber?: string;
        goodsName?: string;
        defectQty?: number;
        normalQty?: number;
        barCode?: string;
        id?: number;
        type: number;
    };
    InOutWarehouse: {
        /** 出入库类型 */
        type: number;
    };
    SelectGoods: {
        goodsCode: string;
        /** 是否残次品 */
        defectOut?: boolean;
    };
};

declare global {
    interface RootProps<RouteName extends keyof RootStackParamList = any>
        extends NativeStackScreenProps<RootStackParamList, RouteName> {}
    // namespace ReactNavigation {
    //     interface RootParamList extends RootStackParamList {}
    // }
}
