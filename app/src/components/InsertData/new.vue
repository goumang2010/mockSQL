<template>
    <div class="content-new">
    <h3>新建任务</h3>
    <hr>
    <div class="left">
        <div class="form-group">
            <label for="name" class="control-label">数据表</label>
            <div  class="group-col">
                <input 
                type="text" 
                class="form-control" 
                id="name" 
                v-model="taskInfo.tbname" 
                placeholder="填写数据表名称，默认为table_name">
            </div>
        </div>
        <div class="form-group">
            <label for="modelType" class="control-label">设备类型</label>
            <div class="group-col">
                <em :class="{selected: taskInfo.modelType===0}" @click="taskInfo.modelType=0;">手机</em> 
                <em :class="{selected: taskInfo.modelType===1}" @click="taskInfo.modelType=1;">PC</em>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label">模型选择</label>
            <div class="group-col">
                <a class="btn btn-sm">
                    <button type="button" class="btn btn-sm btn-default" onclick="document.querySelector('#model_select').click()">打开文件 ...</button>
                </a>
                &nbsp;
                <span id="fileNameModel">{{fileName}}</span>
                <input style="display:none" type="file" id="model_select" accept=".js,.json" @change="getFileName($event)">
            </div>
        </div>
        <div class="form-group">
            <label for="description" class="control-label">预制SQL</label>
            <div class="group-col">
                <textarea class="form-control" rows="8" v-model="taskInfo.preSQL"></textarea>
            </div>
        </div>
        <div class="bottom-form">
            <input type="submit" value="GO" class="btn btn-success" @click="creatTask()" :class="{disabled: !(fileName)}" :disabled="(!fileName)">
            <a class="btn btn-default cancel" >取消</a>
        </div>
    </div>
    <div class="right">
        <label for="output" class="control-label">结果</label>
        <div class="group-col">
            <textarea class="form-control" rows="20" id="output" v-model="output"></textarea>
        </div>
    </div>
    </div>

</template>
<style>
    .content-new {
        width: calc(100% - 50px);
        margin: 0 auto;
        overflow: hidden;
    }
    .left {
        float: left;
        width: 300px;
    }
    .right {
        float: right;
        width: calc(100% - 350px);
    }
    .right textarea {
        height: 100%;
    }
    .group-col em{
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid #ccc;
        font-style: normal;
        display: inline-block;
        height: 22px;
        width: 50px;
        padding: 0 6px;
        text-align: center;
        margin-top: 5px;
        margin-right: 10px;
    }
    em.selected {
        border: 1px solid #449D44;
    }
</style>
<script>
import mockInsert from '../../api/mockInsert';
export default {
    name: 'projectNew',
    data() {
        return {
            id: null,
            fileName: '',
            reportData: {},
            taskInfo: {
                tbname: '',
                modelType: 0,
                preSQL: ''
            },
            output: ''
        };
    },
    components: {
    },
    ready() {
        let fileName = this.$route.query.fileName;
        if (fileName) {
            this.fileName = fileName;
        }
    },
    methods: {
        async creatTask() {
            let arg = {
                _: [this.fileName],
                t: this.taskInfo.tbname,
                r: 100
            };
            let result = mockInsert(arg);
            this.output = `${this.taskInfo.preSQL.replace(/[\s]+$/g, '\n')}${result.join('\n')}`;
        },
        getFileName(e) {
            this.fileName = e.target.files[0].path;
        }
    }
};
</script>
